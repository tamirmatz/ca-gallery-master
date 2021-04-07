function renderProjs() {
    var projs = getProjs()
    var idx = 0;
    var strHTML = projs.map(function(proj) {
        idx++;
        return `
        <div onclick="renderModalContent('${proj.id}' , ${idx} )" class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/0${idx}-thumbnail.jpg" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
          </div>
        </div>
        `
    })
    idx = 0;
    document.querySelector('.projs-preview').innerHTML = strHTML.join('')
}

function renderModalContent(projId, idx) {
    var currProj = getProjById(projId)
    var str = `
    <h2>${currProj.name}</h2>
                <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/0${idx}-full.jpg" alt="">
                <p>${currProj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${currProj.publishedAt}</li>
                  <li>Labels: ${currProj.labels}</li>
                  <li><a href="${currProj.url}">ENTER!</a>
                  </li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
`
    document.querySelector('.modal-body').innerHTML = str;
}
renderModalContent(projId, idx)
