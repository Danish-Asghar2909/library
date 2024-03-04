const express = require('express')
const router = express.Router()
const Subscriber = require('../models/member')
const Books = require('../models/books')

router.put('/checkout' , async ( req , res)=>{
    try{
      const bookId = req.body.bookId;
      if(!bookId) return res.status(500).json({"message" : "Invalid Request , provide book id"})

      const availableBooks = await Books.findOne({ BookID : bookId})

      if(!availableBooks) return res.status(500).json({ message : `Invalid Book ID : ${bookId}`})
      if( availableBooks.NumberOfCopies <= 0){
        return res.status(500).json({ "message" : "Book is out of Stock "})
      }
      const updatedList = await Books.updateOne({ BookID : bookId }, {$inc : { NumberOfCopies : -1}})
      return res.status(200).json({"message":`Successfull checkout of ${bookId}`})

    }catch( err ){
      res.status(500).json({ message: err.message })
    }
})

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router