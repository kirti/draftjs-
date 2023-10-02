import React, { Component } from "react";

class FormattingHints extends Component {
  render() {
    return (
      <div className="formatting-hints">
       <p> Press <code>&#123;</code> for table section,</p>
       <p>Press <code>*</code> for AND/OR</p>
       <p> Press <code>#</code> for IN </p>
      </div>
    );
  }
}

export default FormattingHints;
