import React, { Component, Fragment } from 'react';

class AssignmentReview extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <table className="table table-hover w-100">
          <tr>
            <th> Student </th>
            <th> Score </th>
            <th> </th>
          </tr>

          {
            this.props.students && this.props.students.map((student, i) =>
              <tr key={student.user.username}>
                <td>
                  {student.user ? student.user.name : null}
                </td>
                { 
                  student.teachable_users.filter( teachable_users => student.teachable_users.length === 1 ).map( (teachable_users) => 
                    teachable_users.grades.filter( grades => teachable_users.grades.length === 1 ).map( (grades) =>
                      <td>
                        {console.log('liat isi media', grades.grade)}
                        <strong style={{ opacity: ('1') }}> 
                          { grades.grade }
                        </strong>
                      </td>
                    )
                  )
                } 
                <td>
                  {/* {
                    student.grade ? null : student.media ? (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => this.props.setState(
                          { activeStudent: i + 1 }
                        )}
                      >
                        Periksa<i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    ) : null
                  } */}
                </td>                  
              </tr>
            )
          }
        </table>

      </Fragment>
    );
  }
}

export default AssignmentReview;