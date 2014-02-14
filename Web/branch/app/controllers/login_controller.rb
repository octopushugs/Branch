class LoginController < ApplicationController
	def index
	end

	def process_login

		org_info = Org.where("username = ? AND password = ?", params[:login_username], params[:login_password]).first

		if org_info == nil
			render 'index'
		else
			session[:login] = true
			session[:username] = params[:login_username]
			session[:org_id] = org_info.id
			session[:zipcode] = org_info.zipcode
			session[:user_timezone] = org_info.timezone
			redirect_to url_for(:controller => 'dashboard')
		end

	end

	def logout
		session[:login] = false
		@logout = true
		render 'index'
	end
end
