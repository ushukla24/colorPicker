var htmlHandler, database, network;

function setup() {
  colorMode(RGB, 1);
  htmlHandler = new HtmlHandler();
  database = new Database();
  network = new Network(2);
}