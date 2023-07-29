const Section = require('../models/section')

const getAllSections = async (req, res) => {
    try {
        const sections  = await Section.find()
        res.json(sections)
    } catch(err) {
        console.error("Couldn't retrieve sections:" , err)
        res.status(500).json({message: "A problem occurred while retrieving the sections"})
    }
}

const createSection = async (req, res) => {
    const { sectionName, dimensions, price } = req.body
    try {
        if (!sectionName || !price) {
            res.status(400).json({message: "Please fill out required fields"})
        }

        const sectionObject = { sectionName, dimensions, price }
        const section = await Section.create(sectionObject)
        if (section) {
            res.status(201).json({message: `${sectionName} added!`})
        }
    } catch(err) {
        console.error("An error occurred while creating the section: ", err)
        res.status(500).json({message: "Section could not be created"})
    }
}

const updateSection = async (req, res) => {
    const { id, sectionName, dimensions, price } = req.body
    try {
        const section = await Section.findById(id).exec()

        if (!section) {
            res.status(400).json({message: "Couldn't find section info"})
        }

        section.sectionName = sectionName
        section.dimensions = dimensions
        section.price = price

        await section.save()
    } catch(err) {
        console.error("An error occurred while trying to update section data: ", err)
        res.status(500).json({message: "Section could not be updated"})
    }
}

const deleteSection = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            res.status(400).json({message: "Please enter a valid ID"})
        }

        const section = await Section.findById(id).exec()

        if (!section) {
            res.status(400).json({message: "Couldn't find section info"})
        }

        await section.deleteOne()

        res.json({message: "This section is no longer in our database"})

    } catch(err) {
        console.error("Error deleting section info", err)
        res.status(500).json({message: "There was an error deleting section info"})
    }
}

module.exports = { getAllSections, createSection, updateSection, deleteSection }