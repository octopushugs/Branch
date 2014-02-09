module Api
	module V1
		class StudentsController < ApplicationController
			
			def index
		 		Student.where("student_id = ?", params[:s_id])
			end	

			def student_orgs
				found_orgs = Student_org_lt.where("student_id = ? AND org_id = ?", params[:s_id], params[:o_id])
			end

			def student_events
				found_events = Student_event_lt.where("student_id = ? AND event_id = ?", params[:s_id], params[:e_id])
			end

			def rsvp
				events = Student_event_lt.where("student_id = ? AND event_id = ?", params[:s_id], params[:e_id])
				if events.nil?	
					new_rsvp = Student_event_lt.new
					new_rsvp.student_id = params[:s_id]
					new_rsvp.event_id = params[:e_id]

					new_rsvp.save
					render :text => "ok"
				else
					render :text => "exists"
				end
			end

			def join
				orgs = Student_org_lt.where("student_id = ? AND event_id = ?", params[:s_id], params[:e_id])
				if orgs.nil?
					new_join = Student_org_lt.new
					new_join.student_id = params[:s_id]
					new_join.org_id = params[:o_id]

					new_join.save
					render :text => "ok"
				else
					render :text => "exists"
				end
			end

			def create
				student = Student.new
				student.username = params[:username]
				student.password = params[:password]
				student.email = params[:email]
				student.dob = params[:dob]
				student.city = params[:city]
				student.phone = params[:phone]
				student.full_name = params[:full_name]
				student.zipcode = params[:zipcode]
				student.timezone = params[:timezone]

				student.save
				render :text => "ok"
			end
		
			private
				def student_params
					params.require(:student).permit(:password, :email, :dob, :city, :phone, :full_name)
				end	
		end
	end
end
