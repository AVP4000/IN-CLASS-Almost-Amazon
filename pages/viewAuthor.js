import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import '@fortawesome/fontawesome-free';

const viewAuthor = (obj) => {
  clearDom();
  let domString = '';
  domString += `
    <div class="card text-center" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
        <hr>
        <p class="card-text>${obj.favorite ? '<span class="badge badge-info fave-badge"><i class="fa fa-heart" aria-hidden="true"></span></i> ' : ''}</p>
        <i class="btn btn-success fas fa-eye" id="view-author-btn--${obj.firebaseKey}"></i>
        <i class="fas fa-edit btn btn-info" id="update-author--${obj.firebaseKey}"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i>
      </div>
    </div>`;

  obj.books.forEach((item) => {
    domString += `
        <div class="card text-center" style="width: 18rem;">
          <img class="card-img-top" src=${item.image} alt=${item.title}>
          <div class="card-body" style="height: 180px;">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p> 
              <hr>
              <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
              <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
              <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
              </div>
        </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
