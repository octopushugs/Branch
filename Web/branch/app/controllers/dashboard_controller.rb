class DashboardController < ApplicationController

	helper_method :format_date, :format_time

	def index

		if session[:login] != true
			redirect_to url_for(:controller => 'login', :action => 'index')
		end

		#Pull org information

		@org_info = Org.where(username: session[:username]).first

		#Pull list of events

		@event_list = Event.where(org_id: session[:org_id]).order(start_time: :asc)
		
	end

	def format_date(time_string)
		return time_string.to_time.strftime("%B %-d, %Y")
	end

	def format_time(time_string)
		return time_string.to_time.in_time_zone(@org_info.timezone).strftime("%-l:%M %p")
	end

end
