import React from "react";

class TableScore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="TableScore">
        <table className="ui celled collapsing very basic table">
          <tbody className="">
            <tr>
              <td>#353</td>
              <td className="">
                <h4 className="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                    className="ui mini rounded image"
                    alt=""
                  />
                  <div className="content">
                    Lena
                    <div className="sub header">Human Resources</div>
                  </div>
                </h4>
              </td>
              <td>4000</td>
            </tr>
            <tr>
              <td>#354</td>
              <td className="">
                <h4 className="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    className="ui mini rounded image"
                    alt=""
                  />
                  <div className="content">
                    Matthew
                    <div className="sub header">Fabric Design</div>
                  </div>
                </h4>
              </td>
              <td>3000</td>
            </tr>
            <tr className="table-my-score-team">
              <td>#355</td>
              <td className="">
                <h4 className="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                    className="ui mini rounded image"
                    alt=""
                  />
                  <div className="content">
                    Lindsay
                    <div className="sub header">Entertainment</div>
                  </div>
                </h4>
              </td>
              <td>2000</td>
            </tr>
            <tr>
              <td>#356</td>
              <td className="">
                <h4 className="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    className="ui mini rounded image"
                    alt=""
                  />
                  <div className="content">
                    Mark
                    <div className="sub header">Executive</div>
                  </div>
                </h4>
              </td>
              <td>1000</td>
            </tr>
            <tr>
              <td>#357</td>
              <td className="">
                <h4 className="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    className="ui mini rounded image"
                    alt=""
                  />
                  <div className="content">
                    Mark
                    <div className="sub header">Executive</div>
                  </div>
                </h4>
              </td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableScore;
