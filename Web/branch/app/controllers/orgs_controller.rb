class OrgsController < ApplicationController
	
	def index
	end

	def create
		org = Org.new
		org.name = params[:name]
		org.ppname = params[:ppname]
		org.ppphone = params[:ppphone]
		org.ppemail = params[:ppemail]
		org.ppskype = params[:ppskype]
		org.description = params[:description]
		org.timezone = params[:timezone]
		org.username = params[:username]
		org.password = params[:password]

		org.save
	end

	private
	def org_params
		params.require(:org).permit(:name, :ppname, :ppphone, :ppemail, :ppskype, :password, :description, :timezone, :zipcode)
	end
end
