module.exports = {
    /**
     * Get all error messages from validation
     * 
     * @param  {Object} validation schema from hepi
     * @return {Object} all error messages 
     */
    getMessages(validation){
        if(!validation.error)
            return false;
        
        const allMessage = [];
        
        for(const detail of validation.error.details){
            allMessage.push(detail.message);
        }

        return allMessage;
    },

    allValidation(req, res, shema, optioanal = {}){
        const validation = shema.validate(req.body, {abortEarly: false, ...optioanal});
        // Get all errors validation
        const errorMessages = this.getMessages(validation);
        if(errorMessages){
            console.error(validation.error);
            res.status(400).json({errors: errorMessages});
            return false;
        }

        req.body = validation.value;
        return true;
    }
}