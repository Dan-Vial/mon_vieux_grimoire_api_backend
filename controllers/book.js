
export function create(req, res) {
  handler(req, res)
}

export function getAll(req, res) {
  res.status(200).json([]);
}

export function getById(req, res) {
  handler(req, res)
}


export function update(req, res) {
  handler(req, res)
}

export function remove(req, res) {
  handler(req, res)
}


function handler(req, res) {
  console.log(req.url);
  res.status(200).json({ url: req.url });
}