const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://Avi9984:JM6hnTiQIRViVdA3@cluster0.qfc4n.mongodb.net/crudApp')
    .then(() => console.log("MongoDB is connected"))
    .catch((error) => { console.log(error) });

// Define the schema for the items
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter valid email'] },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Others'] },
    dob: { type: String, required: true },
}, { versionKey: false });

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// GET route to fetch paginated items
app.get('/items', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const items = await Item.find().limit(limit * 1).skip((page - 1) * limit).exec();
        const count = await Item.countDocuments();
        res.json({
            items,
            totalPage: Math.ceil(count / limit), // Calculate total pages
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

// POST route to create a new item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: "Failed to create item" });
    }
});

// PUT route to update an existing item
app.put('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateItem = await Item.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    gender: body.gender,
                    dob: body.dob,
                }
            },
            { new: true }
        );
        if (!updateItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updateItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Failed to update item" });
    }
});

// DELETE route to delete all items
app.delete('/items', async (req, res) => {
    try {
        await Item.deleteMany({});
        res.json({ message: 'All items deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// DELETE route to delete a specific item by ID
app.delete('/items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Item.deleteOne({ _id: id });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
