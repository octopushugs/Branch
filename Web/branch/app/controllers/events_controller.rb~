class EventsController < ApplicationController

	def index
	end

	def create
		event = Event.new
		event.location = params[:location]
		event.description = params[:description]
		event.time = params[:time]
		event.date = params[:date]

		event.save
		
	end
end
