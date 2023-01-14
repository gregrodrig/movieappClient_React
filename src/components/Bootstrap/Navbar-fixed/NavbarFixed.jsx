import React from "react";

export default function NavbarFixed({ titleText, bodyText, btnText }) {
  return (
    <div class="bg-light p-5 rounded">
      <h1>{titleText}</h1>
      <p class="lead">{bodyText}</p>
      <a
        class="btn btn-lg btn-primary"
        href="/docs/5.3/components/navbar/"
        role="button"
      >
        {btnText} »
      </a>
    </div>
  );
}
