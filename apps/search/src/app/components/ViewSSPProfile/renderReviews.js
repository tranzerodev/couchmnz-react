import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* --------------------------------------------
   To render the Reviews Section of the Profile
   -------------------------------------------- */
class RenderReviews extends Component {
  constructor() {
    super();
    this.state = {
      headerState: 'open',
      showBody: false,
      review: {}
    };

    this.handleReviews = this.handleReviews.bind(this);
    this.renderRating1 = this.renderRating1.bind(this);
    this.handleAccord = this.handleAccord.bind(this);
  }
  static get propTypes() {
    return {
      numberOfReviews: PropTypes.number,
      presentSport: PropTypes.string,
      overallRating: PropTypes.number
    };
  }

  handleAccord(event) {
    event.preventDefault();
    if (this.state.showBody === true) {
      this.setState({headerState: 'open', showBody: false});
    } else {
      this.setState({headerState: '', showBody: true});
    }
  }
  handleReviews(revArray) {
    const revertArray = [];
    console.log([revArray]);
    for (let counter = 0; counter <= revArray.length - 1; counter++) {
      revertArray.push(<li key={counter}><img src="{revArray[counter].ProfilePic}"/>{revArray.Reviews[counter].ReviewerDisplayName}<ul>{this.renderRating1(revArray[counter].Rating)}</ul>{revArray[counter].ReviewComment}</li>);
    }
    return (revertArray);
  }

  renderRating1(stars) {
    const starList = [];
    let keyVal = 0;
    for (let i = 0; i <= 4; i++) {
      if (i <= (((stars * 10) - ((stars * 10) % 10)) / 10) - 1) {
        starList.push(
          <label key={keyVal++}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
              <path
                id="Path_40"
                data-name="Path 40"
                className="cls-orange"
                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                transform="translate(-6835.539 -1121)"
              />
            </svg>
          </label>);
      } else
      if (i < stars) {
        starList.push(
          <label key={keyVal++}>
            <svg className="half-star" id="Group_2374" data-name="Group 2374" xmlns="http://www.w3.org/2000/svg" viewBox="-10825 -23071 20 20">
              <defs>
                <clipPath id="clip-path">
                  <rect id="Rectangle_2308" data-name="Rectangle 2308" className="cls-1" width="10" height="20" transform="translate(-10785 -23071)"/>
                </clipPath>
              </defs>
              <path id="Path_324" data-name="Path 324" className="cls-2" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-10825.538 -23071)"/>
              <g id="Mask_Group_17" data-name="Mask Group 17" className="cls-3" transform="translate(-40)">
                <path id="Path_325" data-name="Path 325" className="cls-4" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-10785.539 -23071)"/>
              </g>
            </svg>
          </label>);
      } else {
        starList.push(
          <label key={keyVal++}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
              <path
                id="Path_40"
                data-name="Path 40"
                className="cls-gray"
                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                transform="translate(-6835.539 -1121)"
              />
            </svg>
          </label>);
      }
    }
    return (starList);
  }
  render() {
    return (
      <div id="reviews" className="sec-reviews clear-both custom-accordian-con">
        <div className="sub-heading">
          <h2 className={this.state.headerState} onClick={this.handleAccord}>Reviews &nbsp;&nbsp;
            <span>{this.props.numberOfReviews} in {this.props.presentSport}</span>
          </h2>
          <div className="section-writeReview">
            <a href="#" className="write-review">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5548.5 -1207.5 23.893 13" className="write-review-svg">
                <g id="Group-51" transform="translate(-5548.5 -1208.5)">
                  <g id="Group-50" transform="translate(0.5 1.5)">
                    <path id="Line-7" className="cls-4" d="M.5,1.5H12.44" transform="translate(-0.5 -1.5)"/>
                    <path id="Line-7-Copy" className="cls-4" d="M.5,4.5H8.46" transform="translate(-0.5 -0.52)"/>
                    <path id="Line-7-Copy-2" data-name="Line-7-Copy" className="cls-4" d="M.5,7.5H8.46" transform="translate(-0.5 0.46)"/>
                    <path id="Line-7-Copy-2-2" data-name="Line-7-Copy-2" className="cls-4" d="M.5,10.5H8.46" transform="translate(-0.5 1.44)"/>
                  </g>
                  <path id="Star" className="cls-5" d="M14.553,11.45l-3.9,2.05L11.4,9.158,8.245,6.084,12.6,5.45l1.95-3.95L16.5,5.45l4.359.633L17.708,9.158l.745,4.342Z" transform="translate(2.53 0)"/>
                </g>
              </svg>
                                                    Write a review
            </a>
          </div>
          <div className="clear-both"/>
        </div>
        <div className="content-find-reviews" style={(this.state.showBody ? {display: 'block'} : {display: 'none'})}>
          {/* <div className="uk-grid">
            <div className="uk-width-large-4-10 uk-width-x-large-5-10 change-width">
              <div className="sec-snapshot">
                <h4>Rating Snapshot</h4>
                <span className="instruction-txt">Select a row below to filter reviews.
                </span>
                <div className="sec-snapshot-graph">
                  <div className="snapshot-bar">
                    <div className="star-count">
                      <span>5</span>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="bar" style={{background: '#cccccc', width: '65%'}}>
                      <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                    </div>
                    <div className="rating-count">
                                                                    123
                    </div>
                  </div>
                  <div className="snapshot-bar">
                    <div className="star-count">
                      <span>4</span>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="bar" style={{background: '#cccccc', width: '65%'}}>
                      <div className="orange-bar" style={{background: '#f15e23', width: '35%'}}/>
                    </div>
                    <div className="rating-count">
                                                                    234
                    </div>
                  </div>
                  <div className="snapshot-bar">
                    <div className="star-count">
                      <span>3</span>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="bar" style={{background: '#cccccc', width: '65%'}}>
                      <div className="orange-bar" style={{background: '#f15e23', width: '25%'}}/>
                    </div>
                    <div className="rating-count">
                                                                    345
                    </div>
                  </div>
                  <div className="snapshot-bar">
                    <div className="star-count">
                      <span>2</span>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="bar" style={{background: '#cccccc', width: '65%'}}>
                      <div className="orange-bar" style={{background: '#f15e23', width: '15%'}}/>
                    </div>
                    <div className="rating-count">
                                                                    456
                    </div>
                  </div>
                  <div className="snapshot-bar">
                    <div className="star-count">
                      <span>1</span>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                    <div className="bar" style={{background: '#cccccc', width: '65%'}}>
                      <div className="orange-bar" style={{background: '#f15e23', width: '15%'}}/>
                    </div>
                    <div className="rating-count">
                                                                    567
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          <div className="uk-width-large-6-10 uk-width-x-large-5-10 change-width">
            <div className="sec-average-rating">
              <h4>Average Customer Ratings</h4>
            </div>
            <div className="ac-rating">
              <table className="uk-table">
                <tbody>
                  <tr>
                    <td>Overall</td>
                    <td>
                      <div className="sec-rating">
                        {this.renderRating1(this.props.overallRating)}
                      </div>
                    </td>
                    <td>
                      {this.props.overallRating}
                    </td>
                  </tr>
                  {/* <tr>
                      <td>
                                                                        Responsiveness
                      </td>
                      <td>
                        <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                          <div className="bar-v-line">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                          <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                        </div>
                      </td>
                      <td>
                                                                        36
                      </td>
                    </tr>
                    <tr>
                      <td>
                                                                        Professionalism
                      </td>
                      <td>
                        <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                          <div className="bar-v-line">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                          <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                        </div>
                      </td>
                      <td>
                                                                        4.8
                      </td>
                    </tr>
                    <tr>
                      <td>
                                                                        Preparation
                      </td>
                      <td>
                        <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                          <div className="bar-v-line">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                          <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                        </div>
                      </td>
                      <td>
                                                                        3.9
                      </td>
                    </tr>
                    <tr>
                      <td>
                                                                        Instructional level matched my abilities

                      </td>
                      <td>
                        <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                          <div className="bar-v-line">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                          <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                        </div>
                      </td>
                      <td>
                                                                        4.1
                      </td>
                    </tr>
                    <tr>
                      <td>
                                                                        Skill level and expertise match profile?
                      </td>
                      <td>
                        <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                          <div className="bar-v-line">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                          </div>
                          <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                        </div>
                      </td>
                      <td>
                                                                        4.1
                      </td>
                    </tr> */}
                </tbody>
              </table>
            </div>
            {/*   </div>
          </div>
          <div className="uk-grid uk-grid-nofchild-padding border-top margin0">
            <div className="uk-width-large-5-10 uk-width-x-large-full change-width">
              <div className="review-listing pad-t-30">
                <h4>
                                                            Most Helpful Favorable Review
                </h4>
                <div className="review-row">
                  <div className="uk-flex">
                    <div>
                      <div className="reviewer-image">
                        <img src="../../resources/assets/images/people1.jpg" width="100%" alt="" title=""/>
                      </div>
                    </div>
                    <div>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                      <div className="sec-review-details">

                        <div className="review-date">
                          <span className="r-u">
                                                                                Username
                          </span>
                          <span className="r-d">
                            <i className="fa fa-stop" aria-hidden="true"/>
                                                                                Date of review
                          </span>
                          <span className="r-v">
                            <i className="fa fa-stop" aria-hidden="true"/>
                                                                                Attended session for Baseball
                          </span>
                        </div>
                        <span className="rv-title">Very motivating!</span>
                        <div className="rv-content">
                                                                            Review content lorem ipsum. Review content lorem ipsum. Review content lorem ipsum. Review content….
                          <a className="more-review" href="#">See Full Review</a>
                        </div>
                        <div className="helpfull-content">
                                                                            X out of Y people found this helpful
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="more-review sm-padding-left">
                  <a href="#">
                                                                See more 4 and 5 star reviews
                  </a>
                </div>
              </div>
            </div>
            <div className="uk-width-large-5-10 uk-width-x-large-full change-width">
              <div className="review-listing pad-t-30">
                <h4>
                                                            Most Helpful Critical Review
                </h4>
                <div className="review-row">
                  <div className="uk-flex">
                    <div>
                      <div className="reviewer-image">
                        <img src="../../resources/assets/images/people1.jpg" width="100%" alt="" title=""/>
                      </div>
                    </div>
                    <div>
                      <div className="sec-rating">
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-orange"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-gray"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                        <label>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              className="cls-gray"
                              d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                              transform="translate(-6835.539 -1121)"
                            />
                          </svg>
                        </label>
                      </div>
                      <div className="sec-review-details">

                        <div className="review-date">
                          <span className="r-u">
                                                                                Username
                          </span>
                          <span className="r-d">
                            <i className="fa fa-stop" aria-hidden="true"/>
                                                                                Date of review
                          </span>
                          <span className="r-v">
                            <i className="fa fa-stop" aria-hidden="true"/>
                                                                                Attended session for Baseball
                          </span>
                        </div>
                        <span className="rv-title">Very motivating!</span>
                        <div className="rv-content">
                                                                            Review content lorem ipsum. Review content lorem ipsum. Review content lorem ipsum. Review content….
                          <a className="more-review" href="#">See Full Review</a>
                        </div>
                        <div className="helpfull-content">
                                                                            X out of Y people found this helpful
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="more-review sm-padding-left">
                  <a href="#">
                                                                See more 1, 2, and 3 star reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="review-listing">
            <div className="gray-bar">
              <div className="uk-grid">
                <div className="uk-width-large-6-10 uk-width-medium-4-10 width40Percent change-width-sm">
                  <div className="rv-listing-count">
                                                                1-2 of 124 Reviews
                  </div>
                </div>
                <div className="uk-width-large-4-10 uk-width-medium-6-10 uk-text-right width60Percent">
                  <div className="uk-button-dropdown theme-dropdown" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                    <button className="uk-button">Sort
                      <i className="uk-icon-caret-down"/>
                    </button>
                    <div className="uk-dropdown width-300">
                      <ul className="uk-nav uk-nav-dropdown uk-text-left">
                        <li>
                          <a href="#">Most Helpful</a>
                        </li>
                        <li>
                          <a href="#">Highest to Lowest Rating</a>
                        </li>
                        <li>
                          <a href="#">Lowest to Highest Rating</a>
                        </li>
                        <li>
                          <a href="#">Most Relevant</a>
                        </li>
                        <li>
                          <a href="#">Most Recent</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
                    <button className="uk-button">Filter By
                      <i className="uk-icon-caret-down"/>
                    </button>
                    <div className="uk-dropdown width-300">
                      <ul className="uk-nav uk-nav-dropdown uk-text-left">
                        <li>
                          <label className="container-ck">
                                                                                1 Star Ratings
                            <input type="checkbox" checked="checked"/>
                            <span className="checkmark"/>
                          </label>
                        </li>
                        <li>
                          <label className="container-ck">
                                                                                2 Star Ratings
                            <input type="checkbox"/>
                            <span className="checkmark"/>
                          </label>
                        </li>
                        <li>
                          <label className="container-ck">
                                                                                3 Star Ratings
                            <input type="checkbox"/>
                            <span className="checkmark"/>
                          </label>
                        </li>
                        <li>
                          <label className="container-ck">
                                                                                4 Star Ratings
                            <input type="checkbox"/>
                            <span className="checkmark"/>
                          </label>
                        </li>
                        <li>
                          <label className="container-ck">
                                                                                5 Star Ratings
                            <input type="checkbox"/>
                            <span className="checkmark"/>
                          </label>
                        </li>
                      </ul>
                      <a className="close-dp uk-display-block uk-text-center" href="#">Done</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-action-bar">
              <span className="filter-text">Filters</span>
              <ul className="filter-item-list">
                <li className="themeBlue">
                  <div className="filter-item">
                    <span>5 star rating</span>
                    <a href="#">
                      <svg id="filter-item-delete" xmlns="http://www.w3.org/2000/svg" viewBox="-17363.5 -1476.5 15 15">
                        <g id="delete" transform="translate(-17363 -1476)">
                          <g id="Oval-5">
                            <circle id="Ellipse_168" data-name="Ellipse 168" className="cls-1" cx="7" cy="7" r="7"/>
                          </g>
                          <g id="Group-37" transform="translate(7 2.6) rotate(45)">
                            <path id="Line" className="cls-2" d="M3.111,0V6.222"/>
                            <path id="Line-Copy-14" className="cls-2" d="M6.222,3.111H0"/>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="themedGray">
                  <div className="filter-item">
                    <span>Clear All</span>
                    <a href="#">
                      <svg id="filter-item-delete" xmlns="http://www.w3.org/2000/svg" viewBox="-17363.5 -1476.5 15 15">
                        <g id="delete" transform="translate(-17363 -1476)">
                          <g id="Oval-5">
                            <circle id="Ellipse_168" data-name="Ellipse 168" className="cls-1" cx="7" cy="7" r="7"/>
                          </g>
                          <g id="Group-37" transform="translate(7 2.6) rotate(45)">
                            <path id="Line" className="cls-2" d="M3.111,0V6.222"/>
                            <path id="Line-Copy-14" className="cls-2" d="M6.222,3.111H0"/>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="filter-listing">
              <div className="uk-grid uk-grid-nofchild-padding margin0" style={{padding: '0px'}}>
                <div className="uk-width-large-5-10 uk-width-x-large-full change-width">
                  <div className="review-row">
                    <div className="uk-flex">
                      <div>
                        <div className="reviewer-image">
                          <img src="../../resources/assets/images/people1.jpg" width="100%" alt="" title=""/>
                        </div>
                      </div>
                      <div>
                        <div className="sec-rating">
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-gray"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-gray"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                        </div>
                        <div className="sec-review-details">

                          <div className="review-date">
                            <span className="r-u">
                                                                                    Username
                            </span>
                            <span className="r-d">
                              <i className="fa fa-stop" aria-hidden="true"/>
                                                                                    Date of review
                            </span>
                            <span className="r-v">
                              <i className="fa fa-stop" aria-hidden="true"/>
                                                                                    Attended session for Baseball
                            </span>
                          </div>
                          <span className="rv-title">Review title</span>
                          <div className="rv-content">
                                                                                Review content lorem ipsum. Review content lorem ipsum. Review content lorem ipsum. Review content. Review content lorem
                                                                                ipsum. Review content lorem ipsum. Review
                                                                                content lorem ipsum. Review content.
                                                                                Review content lorem ipsum. Review content
                                                                                lorem ipsum. Review content lorem ipsum.
                                                                                Review content. Review content lorem
                                                                                ipsum. Review content lorem ipsum. Review
                                                                                content lorem ipsum. Review content sample
                                                                                text this is...
                            <a className="more-review" href="#">See Full Review</a>
                          </div>
                          <div className="helpfull-content">
                                                                                Helpful?
                            <div className="helpfull-action">
                              <ul>
                                <li>
                                  <a href="#">Yes</a> - 4
                                </li>
                                <li>
                                  <a href="#">No</a> - 0
                                </li>
                                <li>
                                  <a href="#">Report</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-width-large-5-10 uk-width-x-large-full change-width sm-padding-left-0">
                  <div className="ac-rating">
                    <table className="uk-table">
                      <tbody>
                        <tr>
                          <td>
                                                                                Responsiveness
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                36
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Professionalism
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.8
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Preparation
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                3.9
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Instructional level matched my abilities

                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.1
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Skill level and expertise match profile?
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.1
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="uk-width-1-1">
                  <div className="bottom-dark-border pad-top-bottom"/>
                </div>
              </div>
              <div className=" uk-grid uk-grid-nofchild-padding  margin0">
                <div className="uk-width-large-5-10 uk-width-x-large-full change-width">
                  <div className="review-row">
                    <div className="uk-flex">
                      <div>
                        <div className="reviewer-image">
                          <img src="../../resources/assets/images/people1.jpg" width="100%" alt="" title=""/>
                        </div>
                      </div>
                      <div>
                        <div className="sec-rating">
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-orange"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-gray"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                          <label>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
                              <path
                                id="Path_40"
                                data-name="Path 40"
                                className="cls-gray"
                                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                                transform="translate(-6835.539 -1121)"
                              />
                            </svg>
                          </label>
                        </div>
                        <div className="sec-review-details">

                          <div className="review-date">
                            <span className="r-u">
                                                                                    Username
                            </span>
                            <span className="r-d">
                              <i className="fa fa-stop" aria-hidden="true"/>
                                                                                    Date of review
                            </span>
                            <span className="r-v">
                              <i className="fa fa-stop" aria-hidden="true"/>
                                                                                    Attended session for Baseball
                            </span>
                          </div>
                          <span className="rv-title">Review title</span>
                          <div className="rv-content">
                                                                                Review content lorem ipsum. Review content lorem ipsum. Review content lorem ipsum. Review content. Review content lorem
                                                                                ipsum. Review content lorem ipsum. Review
                                                                                content lorem ipsum. Review content.
                                                                                Review content lorem ipsum. Review content
                                                                                lorem ipsum. Review content lorem ipsum.
                                                                                Review content. Review content lorem
                                                                                ipsum. Review content lorem ipsum. Review
                                                                                content lorem ipsum. Review content sample
                                                                                text this is...
                            <a className="more-review" href="#">See Full Review</a>
                          </div>
                          <div className="helpfull-content">
                                                                                Helpful?
                            <div className="helpfull-action">
                              <ul>
                                <li>
                                  <a href="#">Yes</a> - 4
                                </li>
                                <li>
                                  <a href="#">No</a> - 0
                                </li>
                                <li>
                                  <a href="#">Report</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="uk-width-large-5-10 uk-width-x-large-full change-width sm-padding-left-0">
                  <div className="ac-rating">
                    <table className="uk-table">
                      <tbody>
                        <tr>
                          <td>
                                                                                Responsiveness
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                36
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Professionalism
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.8
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Preparation
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                3.9
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Instructional level matched my abilities

                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.1
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                                                Skill level and expertise match profile?
                          </td>
                          <td>
                            <div className="bar" style={{background: '#cccccc', width: '100%'}}>
                              <div className="bar-v-line">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                              </div>
                              <div className="orange-bar" style={{background: '#f15e23', width: '50%'}}/>
                            </div>
                          </td>
                          <td>
                                                                                4.1
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="uk-width-1-1">
                  <div className="bottom-dark-border pad-top-bottom"/>
                </div>
              </div>
              <div className="filter-listing-more">
                <a className="uk-align-center" href="#">See more reviews</a>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RenderReviews;
