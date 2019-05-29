import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        locaion: `${animal.contact.address.city}, ${
          animal.contact.address.state
        }`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
        showModal: false
      });
    }, console.log);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>gathering pet data...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      name,
      media
    } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <ThemeContext.Consumer>
            {themeHook => (
              <button onClick={this.toggleModal} style={{ backgroundColor: themeHook[0] }}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {this.state.showModal ? (
            <Modal>
              <h2> Would you like to adopt {name}?</h2>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I hate this animal</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
