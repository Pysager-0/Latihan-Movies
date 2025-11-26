// import movieModel from "../models/movieModel.js";

// export const listMovie = async (req, res) => {
//   try {
//     const data = await movieModel.find({
//       createdBy: req.user?.user_id
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       message: "Berhasil mendapatkan list movie",
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       data: null,
//     });
//   }
// };

// export const addListMovie = async (req, res) => {
//   try {
//     const newMovie = await movieModel.create({judul, tahunRilis, sutradara, createdBy: req.user?.user_id});

//     res.status(201).json({
//       message: "Movie berhasil ditambahkan",
//       data: newMovie,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       data: null,
//     });
//   }
// };

// export const updateMovie = async (req, res) => {
//   try {
//     const id = req.params?.id;
//     const request = req.body;

//     if (!id) {
//       return res.status(400).json({
//         message: "ID Movie wajib diisi di parameter URL",
//         data: null,
//       });
//     }

//     const response = await movieModel.findByIdAndUpdate(id, request, { new: true });

//     if (!response) {
//       return res.status(404).json({
//         message: "Data movie tidak ditemukan",
//         data: null,
//       });
//     }

//     return res.status(200).json({
//       message: "Data movie berhasil diupdate",
//       data: response,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       data: null,
//     });
//   }
// };

// export const deleteMovie = async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!id) {
//       return res.status(400).json({
//         message: "ID Movie wajib diisi di parameter URL",
//         data: null,
//       });
//     }

//     const response = await movieModel.findByIdAndDelete(id);

//     if (!response) {
//       return res.status(404).json({
//         message: "Movie tidak ditemukan",
//         data: null,
//       });
//     }

//     return res.status(200).json({
//       message: "Movie berhasil dihapus",
//       data: response,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       data: null,
//     });
//   }
// };


import movieModel from "../models/movieModel.js";
import mongoose from "mongoose";

export const movie = async (req, res) => {
  try {
    const movie = await movieModel.find({
      createdBy: req.user?.user_id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Daftar Semua Movie",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const addNewMovie = async (req, res) => {
  try {
    const { judul, tahunRilis, sutradara } = req.body;

    if (!judul || !tahunRilis || !sutradara) {
      return res.status(400).json({
        message: "Judul, Tahun Rilis, dan Sutradara wajib diisi",
        data: null,
      });
    }

    const movie = await movieModel.create({
      judul,
      tahunRilis,
      sutradara,
      createdBy: req.user?.user_id
    });

    return res.status(201).json({
      message: "Movie baru berhasil ditambahkan",
      data: movie,
    });
  }catch (error) {
    return res.status(500).json({
      message: "Gagal menambahkan movie",
      error: error.message,
      data: null,
    });
  }
};

export  const detailMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id  || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID Movie tidak valid",
        data: null,
      });
    }

    const movie = await movieModel.findOne({ _id: id, createdBy: req.user?.user_id });

    if (!movie) {
      return res.status(404).json({
        message: "Movie tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Detail Movie",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, tahunRilis, sutradara } = req.body;

    if(!id  || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID Movie tidak valid",
        data: null,
      });
    }

    const updateMovie = await movieModel.findOneAndUpdate(
      { _id: id, createdBy: req.user?.user_id },
      { judul, tahunRilis, sutradara },
      { new: true }
    );

    if (!updateMovie) {
      return res.status(404).json({
        message: "Movie tidak ditemukan",
        data: null,
      });
    }
    return res.status(200).json({
      message: "Movie berhasil diupdate",
      data: updateMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id  || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID Movie tidak valid",
        data: null,
      });
    }

    const deletedMovie = await movieModel.findOneAndDelete({ _id: id, createdBy: req.user?.user_id });

    if (!deletedMovie) {
      return res.status(404).json({
        message: "Movie tidak ditemukan",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Movie berhasil dihapus",
      data: deletedMovie,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
      data: null,
    });
  }
};