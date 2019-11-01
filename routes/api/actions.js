const express = require('express');
const router = express.Router();

// load database model
const db = require('../../data/helpers/actionModel');
const Projects = require('../../data/helpers/projectModel');

// test actions route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Actions route works' });
});

// get all actions
router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      if (!actions) {
        return res.status(404).json({ message: 'Actions not found' });
      }
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: `${err}` });
    });
});

// add action
router.post('/:id', (req, res) => {
  const { id } = req.params;
  const newAction = {
    project_id: id,
    description: req.body.description,
    notes: req.body.notes
  };
  Projects.get(id)
    .then(project => {
      if (!project) {
        return res
          .status(404)
          .json({ message: 'Project with the given id was not found' });
      }
      db.insert(newAction)
        .then(action => {
          res.status(201).json(action);
        })
        .catch(err => {
          res.json({ err });
        });
    })
    .catch(err => {
      res.json({ err: `${err}` });
    });
});

// delete action
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(action => {
      if (!action) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.status(200).json({ messae: 'Deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// update action
router.put('/:project_id/:action_id', (req, res) => {
  const { project_id, action_id } = req.params;
  const updatedData = {
    project_id,
    description: req.body.description,
    notes: req.body.notes
  };
  Projects.get(project_id)
    .then(project => {
      db.update(action_id, updatedData)
        .then(action => {
          if (!action) {
            return res
              .status(404)
              .json({ message: 'Project with the given id does not exist' });
          }
          res.status(200).json(action);
        })
        .catch(err => {
          res.status(500).json({ err: 'ooops' });
        });
    })
    .catch(err => res.status(500).json({ err: `${err}` }));
});

module.exports = router;
