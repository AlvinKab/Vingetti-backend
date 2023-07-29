const Customer = require('../models/customer')

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        console.error("Can't retrieve customer info", err)
        res.status(500).json({message: "There was an issue retrieving customer info"})
    }
}

const getOneCustomer = async (req, res) => {
    try {
        const { id } = req.body
        const customer = await Customer.findById(id)
        if (!customer) {
            res.status(400).json({message: "Couldn't find customer info"})
        }
        res.json(customer)
    } catch(err) {
        console.error("Can't retrieve customer info", err)
        res.status(500).json({message: "There was an issue retrieving customer info"})
    }
}

const createCustomer = async (req, res) => {
    const { randomID, firstName, surname } = req.body
    try {
        if (!randomID || !firstName || !surname) { // Will remove randomID later
            res.status(400).json({message : "Please enter your name :)"})
        }

        const customerObject = { randomID, firstName, surname }
        const customer = await Customer.create(customerObject)
        if (customer) {
            res.status(201).json({message: "Have fun!"})
        }
    } catch (err) {
        console.error("Error creating new customer", err)
        res.status(500).json({messsage: "There was an issue saving new customer"})
    }
}

const updateCustomer = async (req, res) => {
    const { id, randomID, firstName, surname, section, date } = req.body
    try {
        if (Date.now() - date >= 86400000) {
            res.status(403).json({message: "Please create a new ID. The old one is long overdue"})
        }
        if (!section) {
            res.status(400).json({message: "Where do you want to go?"})
        }

        const customer = await Customer.findById(id).exec()

        if(!customer) {
            res.status(400).json({message: "Couldn't find customer info"})
        }

        customer.randomID = randomID
        customer.firstName = firstName
        customer.surname = surname
        customer.section = section

        await customer.save()
    } catch(err) {
        console.error("Error updating customer info", err)
        res.status(500).json({message: "There was an issue saving updated info"})
    }
}

const deleteOneCustomer = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            res.status(400).json({message : "Please enter the ID of the customer whose info you want to delete"})
        }

        const customer = await Customer.findById(id).exec()

        if (!customer) {
            res.status(400).json({message: "Couldn't find customer info"})
        }

        await customer.deleteOne()

        res.json({message: "This user is no longer in our database"})

    } catch(err) {
        console.error("Error deleting customer info", err)
        res.status(500).json({message: "There was an error deleting customer info"})
    }
}

const deleteAllCustomers = async (req, res) => {
    try {
        const oneYearAgo = Date.now() - 31536000000
        const condition = {
            $expr: {
                $gte: ['$createdAt', new Date(oneYearAgo)],
            },
        }
        await Customer.deleteMany(condition)
        res.json({message: "All inactive customers have been deleted from the database"})
    } catch(err) {
        console.error("Error deleting customer info", err)
        res.status(500).json({message: "There was an error deleting customer info"})
    }
}

module.exports = { getAllCustomers, getOneCustomer, createCustomer, updateCustomer, deleteOneCustomer, deleteAllCustomers }