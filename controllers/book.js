import { unlink } from 'node:fs/promises';
import Book from '../models/book.js';

export async function create(req, res) {
  try {
    const bookObect = JSON.parse(req.body.book);

    const book = new Book({
      userId: req.auth.userId,
      title: bookObect.title,
      author: bookObect.author,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      year: bookObect.year,
      genre: bookObect.genre,
      ratings: [
        {
          userId: bookObect.ratings[0].userId,
          grade: bookObect.ratings[0].grade
        }
      ],
      averageRating: bookObect.averageRating,
    })

    try {
      await book.save()
      res.status(201).json({ message: 'Book Created' })
    } catch (error) {
      res.status(400).json({ error })
    }

  } catch (error) {
    res.status(500).json({ error })
  }
}

export async function getAll(req, res) {
  try {
    const books = await Book.find()

    if (books === null) return res.status(404).json({ error: 'Books not found' });
    return res.status(200).json(books)

  } catch (error) {
    res.status(500).json({ error })
  }
}

export async function getById(req, res) {
  try {
    const book = await Book.findOne({
      _id: req.params.id
    })

    if (book === null) return res.status(404).json({ error: 'Book not found' });
    return res.status(200).json(book)

  } catch (error) {
    res.status(500).json({ error })
  }
}


export async function update(req, res) {
  try {
    const bookObject = req.file ?
      {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } :
      { ...req.body };

    const book = await Book.findOne({
      _id: req.params.id
    })

    if (book === null) return res.status(404).json({ error: 'Book not found' });
    if (book.userId != req.auth.userId) return res.status(401).json({ message: 'Not authorized' });

    try {
      await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
      res.status(200).json({ message: 'Objet update' })

    } catch (error) {
      res.status(401).json({ error })
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function remove(req, res) {
  try {
    const book = await Book.findOne({
      _id: req.params.id
    })
    if (book === null) return res.status(404).json({ error: 'Book not found' });
    if (book.userId != req.auth.userId) return res.status(401).json({ message: 'Not authorized' });

    try {
      const filename = book.imageUrl.split('/images/')[1];

      await unlink(`images/${filename}`)
      await Book.deleteOne({ _id: req.params.id })
      res.status(200).json({ message: 'Objet delete' })

    } catch (error) {
      res.status(401).json({ error })
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getBestRating(req, res) {
  try {
    const books = await Book.find({}, null, { sort: { averageRating: -1 } }).limit(3)

    if (books === null) return res.status(404).json({ error: 'Books not found' });
    return res.status(200).json(books)

  } catch (error) {
    res.status(500).json({ error })
  }
}

export async function voteById(req, res) {
  try {
    const book = await Book.findOne({
      _id: req.params.id
    })
    if (book === null) return res.status(404).json({ error: 'Book not found' });

    // book.ratings.findOne({req.auth.userId})
    for (const rating of book.ratings) {
      if (rating.userId === req.auth.userId) {
        return res.status(401).json({ message: 'Already voted' });
      }
    }

    const ratingsObject = {
      ratings: [
        ...book.ratings,
        {
          userId: req.auth.userId,
          grade: req.body.rating
        }
      ],
      averageRating: (book.averageRating + req.body.rating) / 2
    }

    await Book.updateOne({ _id: req.params.id }, { ...ratingsObject, _id: req.params.id })
    return res.status(200).json(await Book.findOne({
      _id: req.params.id
    }))

  } catch (error) {
    res.status(500).json({ error })
  }
}
