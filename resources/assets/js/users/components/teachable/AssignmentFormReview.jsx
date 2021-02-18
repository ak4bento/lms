import React, { Component, Fragment } from 'react';
import Grade from '../../api/grade';

class AssignmentFormReview extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.api = new Grade();
    this.state = {
      score: 0,
      feedback: '',
      saving: false
    }
  }

  save() {
    if (this.state.saving)
      return;

    this.api.store({
      data: {
        context: 'teachableUser',
        teachable: this.props.students[this.props.activeStudent - 1].student.id,
        score: this.state.score,
        feedback: this.state.feedback
      },
      params: {},
      cb: result => {
        if (result.isSuccess) this.props.setState({ activeStudent: false });
      },
      err: err => {
        console.log(err);
      }
    })
  }

  componentDidMount() {
  }

  render() {
    const student = this.props.students ? this.props.students[this.props.activeStudent - 1] : null;

    return (
      <div>
        <a
          href="#"
          className="text-link py-5"
          onClick={() => this.props.setState({ activeStudent: false })}
        >
          <i className="fa fa-angle-left"> </i> Kembali
        </a>

        <div className="p-4">
          <h4>{student ? student.student.classroom_user.user.name : null}</h4>
          <div className="mb-2 p-2 border shadowed rounded">
            <div className="d-flex align-items-center">
              <div className="h1 m-0 mr-3 text-muted text-center" style={{ width: "36px" }}>
                <i className="fas fa-file-pdf"></i>
              </div>
              <div style={{ minWidth: "0px", flex: "1 1 0%" }}>
                <div className="text-truncate">{student.media ? student.media.collection_name : null}</div>
                <div className="d-flex justify-content-between">
                  <div className="text-muted">{student.media ? student.media.size + 'KB' : null}</div>
                  <a href={`/download/${student.media.id}`} className="text-link" download><i className="fas fa-download"></i> Download</a>
                </div>
              </div>
            </div>
            {/* <a href={ media.downloadUrl } className="text-link"><i className="fas fa-download"></i> Download</a> */}
          </div>
          <div className="form-group my-4">
            <label>Nilai</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nilai"
              step="0.01"
              onChange={(e) => this.setState({ score: e.currentTarget.value })} />
          </div>
          <div className="form-group my-4">
            <label>Feedback</label>
            <textarea
              className="form-control"
              value={this.state.feedback}
              onChange={(e) => this.setState({ feedback: e.currentTarget.value })}
            >
            </textarea>
          </div>
          <div className="grey-bg text-right py-4">
            <a className="link third-link padding-half" onClick={() => this.props.setState({
              openModal: false, activeStudent: false
            })}>
              Tutup
            </a>&nbsp;
            <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}> Simpan </button>
          </div>
        </div>



      </div>
    );
  }
}

export default AssignmentFormReview;