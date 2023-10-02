import React from "react";
import Editor from "draft-js-plugins-editor";
import { EditorState, convertToRaw,  RichUtils, getDefaultKeyBinding , KeyBindingUtil } from "draft-js";
import createMentionPlugin, {
  defaultSuggestionsFilter
} from "draft-js-mention-plugin";
import mentions from "./mentions";
import mentions2 from "./mentions2";
import mentions3 from "./mentions3";
import "draft-js-mention-plugin/lib/plugin.css";
import { Button } from "react-bootstrap";
const mentionPlugin = createMentionPlugin({
  entityMutability: "IMMUTABLE",
  mentionTrigger: "{"
});

const mentionPlugin1 = createMentionPlugin({
  entityMutability: "IMMUTABLE",//
  mentionTrigger: "*"
});

const mentionPlugin2 = createMentionPlugin({
  entityMutability: "IMMUTABLE",//
  mentionTrigger: "#"
});

const { MentionSuggestions } = mentionPlugin1;
const { MentionSuggestions: MentionSuggestions2 } = mentionPlugin;
const { MentionSuggestions: MentionSuggestions3 } = mentionPlugin2;



const MentionTriggerButton = props => {
  return (
    <Button bsStyle="default" bsSize="xsmall">
      🔽
    </Button>
  );
};

class TemplateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Editor state is
      editorState: EditorState.createEmpty(),
      suggestions: mentions,
      suggestions2: mentions2,
      suggestions3: mentions3
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchChange2 = this.onSearchChange2.bind(this);
    this.onSearchChange3 = this.onSearchChange3.bind(this);
  }

 /* keyBindingFn = (event) => {
    console.log( event.keyCode)
    // we press CTRL + K => return 'bbbold'
    // we use hasCommandModifier instead of checking for CTRL keyCode because different OSs have different command keys
   // if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 9) { 
    if( event.keyCode === 32){
      console.log( event.keyCode,'inside')
      return 'bbbold'; 
    
    }
    // manages usual things, like:
    // Ctrl+Z => return 'undo'
    return getDefaultKeyBinding(event);
  }*/

  /// command: string returned from this.keyBidingFn(event)
  // if this function returns 'handled' string, all ends here.
  // if it return 'not-handled', handling of :command will be delegated to Editor's default handling.
  /*handleKeyCommand = (command) => {
    let newState;
    if (command === 'bbbold') {
      newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    }

    if (newState) {
      this.setState({ editorState: newState });
      return 'handled';
    }
    return 'not-handled';
  }*/

  /**
   * Runs when the editor value is changed by the user (usually typing)
   */
  onChange(editorState) {
    console.log(
      JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)
    );
    this.setState({ editorState });
  }

  onFocus() {
    this.editor.focus();
  }

  onSearchChange({ value }) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    });
  }
  onSearchChange2({ value }) {
    this.setState({
      suggestions2: defaultSuggestionsFilter(value, mentions2)
    });
  }

  onSearchChange3({ value }) {
    this.setState({
      suggestions3: defaultSuggestionsFilter(value, mentions3)
    });
  }

  render() {
    console.log(this.editorState);
    return (
      <div className="template-input" onClick={this.onFocus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[mentionPlugin , mentionPlugin1 , mentionPlugin2]}
          ref={e => {
            this.editor = e;
          }}
          /*keyBindingFn={this.keyBindingFn}*/
        />
         <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
       
         <MentionSuggestions2
          onSearchChange={this.onSearchChange2}
          suggestions={this.state.suggestions2}
          onAddMention={this.onAddMention}
        />

     <MentionSuggestions3
          onSearchChange={this.onSearchChange3}
          suggestions={this.state.suggestions3}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}

export default TemplateInput;
