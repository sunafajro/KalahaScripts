import React from "react";

import CategorySelector from "../components/CategorySelector";
import ImageDisplay from "../components/ImageDisplay";
import ImageLine from "../components/ImageLine";

export default class App extends React.Component {
  state = {
    currentImage: {},
    categories: {},
    fetching: false,
    images: {},
    selectedCategory: "",
    showTerm: false
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    this.setState({ fetching: true });
    fetch("/api/categories-words", {
      method: "POST",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка!");
        }
        return response.json();
      })
      .then(result => {
        const categories = result.length === undefined ? { ...result } : {};
        if (Object.keys(categories).length) {
          const selectedCategory = Object.keys(categories)[0];
          this.setState({
            fetching: false,
            categories,
            selectedCategory
          });
          this.onCategorySelect(selectedCategory);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * @param { string } category
   */
  onCategorySelect = category => {
    const { currentImage, images } = this.prepareImages(this.state.categories, category);
    this.setState({ currentImage, selectedCategory: category, images });
  };

  /**
   * @param { Object } categories
   * @param { string } selectedCategory
   */
  prepareImages = (categories, selectedCategory) => {
    let currentImage = {};
    let images = {};

    if (categories[selectedCategory] && categories[selectedCategory].words) {
        images = { ...categories[selectedCategory].words };
        currentImage = { ...images[Object.keys(images)[0]] };
    }
    return { currentImage, images };
  }

  /**
   * @param { string } img
   */
  onImageSelect = img => {
    this.setState({ currentImage: { ...this.state.images[img] }, showTerm: false });
  };

  onImageClick = () => {
    this.setState({ showTerm: true });
  }

  render() {
    const baseUrl = "/files/images/flashcards/kalaha1";
    const {
      categories,
      currentImage,
      fetching,
      images,
      selectedCategory,
      showTerm
    } = this.state;
    return (
      <div>
        { !fetching ? 
          <div className="panel panel-default">
            <div className="panel-heading">
              { Object.keys(categories).length ?
                  <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={this.onCategorySelect}
                  /> : <b>Нет доступных категории. :(</b> }
            </div>
            <div className="panel-body">
              { Object.keys(categories).length ?
                <div className="row">
                  { Object.keys(currentImage).length ?
                    <ImageDisplay currentImage={currentImage} baseUrl={baseUrl} onImageClick={this.onImageClick} showTerm={showTerm} /> :
                    <div className="alert alert-warning">Изображение отсутствует :(</div> }
                  { Object.keys(images).length ?
                    <ImageLine  currentImage={currentImage} images={images} onImageSelect={this.onImageSelect} baseUrl={baseUrl} /> :
                    <div className="alert alert-warning">Изображения отсутствуют :(</div> }
                </div> : "" }
            </div>
          </div> : 
          <div className="alert alert-warning">Идет загрузка данных...</div> }
      </div>
    );
  }
}
