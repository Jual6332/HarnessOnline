/**
 * Templates in information to send on render
 * @return {String} A string full of information
 */
export default function ({
  appLink, body, head, manifest,
  state, styles, version, vendorLink
}) {
  return `
    <!doctype html>
    <html>
      <!-- ${version} -->
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
        </style>
        <style>
          ${styles}
        </style>
        ${head}
      </head>
      <body>
        <div id="root">${body}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
        ${manifest ? `<script>${manifest}</script>` : ''}
        <script src="${vendorLink}"></script>
        <script src="${appLink}"></script>
      </body>
    </html>
  `;
}
