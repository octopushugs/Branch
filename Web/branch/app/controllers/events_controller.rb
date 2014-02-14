class EventsController < ApplicationController

	def index
	end

	def create
		event = Event.new
		event.event_name = params[:event_name]
		event.start_time = (params[:event_date] + " " + params[:event_start] + " " + params[:event_start_am]).to_time
		event.end_time = (params[:event_date] + " " + params[:event_end] + " " + params[:event_end_am]).to_time
		event.location = params[:event_address]
		event.description = params[:event_details]
		event.zipcode = session[:zipcode]
		event.org_id = session[:org_id]

		event.save

		render 'index'
		
	end
end
