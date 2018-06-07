import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Amenities from './Amenities.jsx';
import Description from './Description.jsx';
import Highlights from './Highlights.jsx';
import Summary from './Summary.jsx';

const fakeGeneralInfo = JSON.parse('{"id":1,"title":"Practical Fantastic Home","location":"Rosenbaummouth","home_type":"Intelligent HOUSE","owner":{"name":"Pearl","avatar_url":"https://s3.amazonaws.com/uifaces/faces/twitter/falvarad/128.jpg"},"property_features":{"guests":3,"bedrooms":0,"beds":5,"baths":4},"highlights":[{"head":"Indoor fireplace","body":""},{"head":"Self check-in","body":""},{"head":"Great check-in experience","body":""}],"short_description":"Harum perspiciatis minima tempore nobis sed.","more_description":[{"head":"The space","body":"Adipisci reprehenderit repudiandae blanditiis. Dolor assumenda consectetur fuga. Eveniet amet optio quo veniam vel at quas. Nisi et autem et magni dolorem accusamus ipsam eius laborum."},{"head":"Guest access","body":"Labore rerum sed tempore ipsa magnam odio ducimus modi error."}]}');
const fakeAmenities = JSON.parse('{"id":1,"items":[{"category_head":"Industrial","category_items":[{"amenity_description":"primary","supplemental_description":"Qui ut qui reiciendis omnis id delectus assumenda."},{"amenity_description":"Pa\'anga","supplemental_description":"Optio odio odio."},{"amenity_description":"Customer-focused","supplemental_description":"Vel sed ad optio et eligendi ab."}]}]}');

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Modal = styled.div`
  display: ${props => props.displayModal};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ShowAll = styled.div`
  order: 4;
  color: blue;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.id = window.location.pathname.match(/[0-9]+/) || [1];
    this.handleAmenitiesDisplay = this.handleAmenitiesDisplay.bind(this);
    this.handleAmenitiesHide = this.handleAmenitiesHide.bind(this);
    this.state = {
      generalInfo: fakeGeneralInfo,
      amenities: fakeAmenities,
      displayModal: 'none',
    };
  }

  componentDidMount() {
    this.getGeneralInfo();
    this.getAmenities();
  }

  getGeneralInfo() {
    $.ajax({
      url: `/api/room/${this.id[0]}/general`,
      type: 'GET',
      success: data => this.setState({
        generalInfo: JSON.parse(data),
      }),
    });
  }

  getAmenities() {
    $.ajax({
      url: `/api/room/${this.id[0]}/amenities`,
      type: 'GET',
      success: data => this.setState({
        amenities: JSON.parse(data),
      }),
    });
  }

  handleAmenitiesDisplay() {
    this.setState({
      displayModal: 'flex',
    });
  }

  handleAmenitiesHide() {
    this.setState({
      displayModal: 'none',
    });
  }

  render() {
    return (
      <Wrapper>
        <Summary
          title={this.state.generalInfo.title}
          location={this.state.generalInfo.location}
          home_type={this.state.generalInfo.home_type}
          owner={this.state.generalInfo.owner}
          property_features={this.state.generalInfo.property_features}
        />
        <Highlights highlights={this.state.generalInfo.highlights} />
        <Description
          short_description={this.state.generalInfo.short_description}
          more_description={this.state.generalInfo.more_description}
        />
        <ShowAll onClick={this.handleAmenitiesDisplay}>Show all amenities</ShowAll>
        <Modal
          name="modal"
          displayModal={this.state.displayModal}
          onClick={this.handleAmenitiesHide}
        >
          <Amenities amenities={this.state.amenities} />
        </Modal>
      </Wrapper>
    );
  }
}
