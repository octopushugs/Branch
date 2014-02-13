class DashboardController < ApplicationController
	def index
		if session[:login] != true
			redirect_to url_for(:controller => 'login', :action => 'index')
		end
		
		@org_info = Org.where(username: session[:username]).first
	end
end
