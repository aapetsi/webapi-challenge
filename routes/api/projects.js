const express = require('express');
const router = express.Router();

// load database model
const db = require('../../data/helpers/projectModel');

// test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Projects route works' });
});

// get all projects
router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      if (!projects) {
        return res.status(404).json({ message: 'No projects found' });
      }
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: `${error}` });
    });
});

// add project
router.post('/', (req, res) => {
  const newProject = {
    name: req.body.name,
    description: req.body.description
  };
  db.insert(newProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: `${error}` });
    });
});

// delete project
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(project => {
      if (!project) {
        return res
          .status(404)
          .json({ error: 'No project found with the given id' });
      }
      res.status(200).json({ message: 'Project successfully deleted' });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = {
    name: req.body.name,
    description: req.body.description
  };
  db.update(id, updatedData)
    .then(project => {
      if (!project) {
        return res
          .status(404)
          .json({ message: 'Project with the given id does not exist' });
      }
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` });
    });
});

module.exports = router;
