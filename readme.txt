Configure json-server:
1. install json-server
npm install -g json-server

2. create db.json (in json format)

Example:
{
  "products": [
    {
      "id": 1,
      "title": "MacBook",
      "price": 900,
      "year": "2022",
      "image": "assets/Images/macbook.jpg",
      "configure": {
        "chip": "M1",
        "ssd": "256GB",
        "memory": "16GB",
        "display": "Retina"
      }
    },   
....
}

3. run json server via command: 
json-server --watch db.json

Detalis:
https://www.npmjs.com/package/json-server