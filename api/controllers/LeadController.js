/**
 * LeadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
	create: function(req, res) {
		sails.log.debug(req.allParams())
		Lead.create(req.allParams())
			.then(function(Lead){
				return res.send({
					'success': true,
					'message': 'create Lead successfully!'
				})
			})
			.catch(function(err){
				return res.send({
					'success': false,
					'message': 'unable to create lead'
				})
			})
	}		
};

