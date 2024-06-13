// validator.js
class Validator {
    // Validate email using regex
    static isValidEmail(email) {
        // return /^[\w.]{2,}@atmecs\.com$/.test(email);
        return /^[\w]{2,}@gmail\.com$/.test(email);
    }

    // Validate password using regex
    static isValidPassword(password) {
        // Add your password validation regex here
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/.test(password);
    }
    static async validateChat(chatId,empId,role){
      

        const chat = await Chat.findById(chatId);
        
        if (!chat) {
           throw new ApiError(404, 'Chat not found');
       }
       
       
       if(chat.empId!=empId)
           {
              
               if(role=='admin')return;
               throw new ApiError(401,'you UnAuthorized to get details of another user !!');
           }
       }
       static async validateUuid(uuid,empId,role){
      

     
       
       
      
       }
}

module.exports = Validator;
