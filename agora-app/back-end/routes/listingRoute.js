import express from 'express';
import Listing from '../models/listingModel';

const router = express.Router();

// Fetches listings from the database and posts to '/' (home page).
router.get('/', async (req, res) =>{
    const categorySortOrder = req.query.categorySortOrder ? { 
      category: { 
        $regex: req.query.categorySortOrder,
        $options: 'i',
      },
    } : {};
    const locationSortOrder = req.query.locationSortOrder ? { 
      location: { 
        $regex: req.query.locationSortOrder,
        $options: 'i',
      },
    } : {};
    const listings = await Listing.find({...categorySortOrder, ...locationSortOrder});
    res.send(listings); 
}); 

router.get('/:id', async (req, res) => {
    const listing = await Listing.findOne({ _id: req.params.id });
    if (listing) {
      res.send(listing);
    } else {
      res.status(404).send({ message: 'Listing Not Found.' });
    }
});

export default router;