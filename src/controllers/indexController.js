const Project = require('../models/projects');

exports.landingPage = async (req, res) => {
  try {
    let project = await Project.find();
    return res
      .status(200)
      .json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message});
  }
}

exports.addProjects = async (req, res) => {
  try {
    const { title } = req.body;
    const project = req.body;

    // Make sure this project doesn't already exist
    const newProject = await Project.findOne({ title });
      if (newProject) {
        return res
          .status(401)
          .json({ message: "This project already exists."});
      }

      // Create and save new project
      await new Project({
      url: project.url,
      image: project.image,
      title: project.title,
      role: project.role,
      brief: project.brief,
      techStack: project.techStack,
      projectLink: project.projectLink
    });

    if (project === "") {
      res.redirect('/');
    }

    await newProject.save();

    return res.status(200).json('Project saved');
  } catch (error) {
    console.log(error);
  }
}

exports.fetchSingleProject = async (req, res) => {
  try {
    // console.log(`yooo this the params: ${req.params.id}`);
    let project = await Project.findById(req.params.id);
    return res
      .status(200)
      .json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message});
  }
}
