import React from "react";

export default function Jumbotron({ titleText, bodyText, btnText }) {
  return (
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">{titleText}</h1>
        <p class="col-md-8 fs-4">{bodyText}</p>
        <button class="btn btn-primary btn-lg" type="button">
          {btnText}
        </button>
      </div>
    </div>
  );
}
