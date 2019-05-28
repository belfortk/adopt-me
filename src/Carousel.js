import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  // Now Carousel never gets a huge media array from props
  // it just takes media and extracts the photos it wants and puts them into state

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    // return an object to be merged into the state
    return { photos };
  }

  handleClick = e => {
    this.setState({
      // the unary plus sign coerces string into nummber
      // could also do parseInt()
      active: +e.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, i) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleClick}
              data-index={i}
              src={photo}
              className={i === active ? "active" : ""}
              alt="animal-thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
