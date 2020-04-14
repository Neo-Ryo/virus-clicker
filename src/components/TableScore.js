import React from "react";

class TableScore extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="TableScore">
        <table className="ui celled collapsing very basic table">
          <tbody class="">
            <tr>
              <td>#353</td>
              <td class="">
                <h4 class="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                    class="ui mini rounded image"
                    alt=""
                  />
                  <div class="content">
                    Lena
                    <div class="sub header">Human Resources</div>
                  </div>
                </h4>
              </td>
              <td>4000</td>
            </tr>
            <tr>
              <td>#354</td>
              <td class="">
                <h4 class="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    class="ui mini rounded image"
                    alt=""
                  />
                  <div class="content">
                    Matthew
                    <div class="sub header">Fabric Design</div>
                  </div>
                </h4>
              </td>
              <td>3000</td>
            </tr>
            <tr>
              <td>#355</td>
              <td class="">
                <h4 class="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                    class="ui mini rounded image"
                    alt=""
                  />
                  <div class="content">
                    Lindsay
                    <div class="sub header">Entertainment</div>
                  </div>
                </h4>
              </td>
              <td>2000</td>
            </tr>
            <tr>
              <td>#356</td>
              <td class="">
                <h4 class="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    class="ui mini rounded image"
                    alt=""
                  />
                  <div class="content">
                    Mark
                    <div class="sub header">Executive</div>
                  </div>
                </h4>
              </td>
              <td>1000</td>
            </tr>
            <tr>
              <td>#357</td>
              <td class="">
                <h4 class="ui image header">
                  <img
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    class="ui mini rounded image"
                    alt=""
                  />
                  <div class="content">
                    Mark
                    <div class="sub header">Executive</div>
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
