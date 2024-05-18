import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json({
            success: true,
            status: 200,
            message: "Hotel successfully deleted !"
        });
    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

export const getAllHotels = async (req, res, next) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const perPage = parseInt(req.body.perPage) || 10;
        const sortBy = req.body.sortBy;
        const direction = req.body.direction;

        let sort = {};
        if (sortBy) {
            sort[sortBy] = direction === 'desc' ? -1 : 1;
        }

        const skip = (page - 1) * perPage;
        const hotels = await Hotel.find().skip(skip).limit(perPage).sort(sort);
        const total = await Hotel.countDocuments();

        res.status(200).json({
            data: hotels,
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage)
        });
    } catch (err) {
        next(err);
    }
}