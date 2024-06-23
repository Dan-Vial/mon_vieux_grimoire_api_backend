export const book = (req, res, next) => {
  try {
    const bookObject = req.file ?
      {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } :
      { ...req.body };

    const title = bookObject.title;
    const author = bookObject.author;
    const genre = bookObject.genre;
    const year = Number(bookObject.year);

    if (title !== undefined && title.length > 0 && author !== undefined && author.length > 0 &&
      year !== undefined && year > 0 && genre !== undefined && genre.length > 0
    ) {

      if (req.file) {
        req.body = {
          book: JSON.stringify({
            ...bookObject,
            title: title,
            author: author,
            genre: genre,
            year: year,
          })
        };
      } else {
        req.body.title = title;
        req.body.author = author;
        req.body.genre = genre;
        req.body.year = year;
      }

      next();
    } else {
      console.log(title, author, year, genre);
      return res.status(400).json({ error: new Error('Bad Request') });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: new Error('Something wrong occured') });
  }
};

export const user = (req, res, next) => {
  try {
    const email = isEmailValid(req.body.email);
    const password = req.body.password;

    if (email !== undefined && email.length > 0 && password !== undefined && password.length > 0) {
      req.body.email = email[0].trim();
      req.body.password = password;
      next();
    } else {
      return res.status(400).json({ error: new Error('Bad Request') });
    }
  } catch (error) {
    return res.status(500).json({ error: new Error('Something wrong occured') });
  }
};

function isEmailValid(email) {
  return email.trim().toLowerCase()
    .match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+ /=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a -z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}( ?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0 -9] :(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+ )\])/
    );
}

function isPasswordValid(password) {
  return; //test quality password: length (min,max), complexity (alpha, num), ...
}

//String.fromCharCode(ent.slice(2));
function jsEscape(str) {
  return String(str.trim()).replace(/[^\w. ]/gi, function (c) {
    return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

//String.fromCharCode(ent.slice(2,-1));
function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}