class ChangeEventsTable < ActiveRecord::Migration
  def change

  	remove_column :events, :orgs_id
  	remove_column :events, :time
  	add_column :events, :start_time, :string
  	add_column :events, :end_time, :string
  	add_column :events, :event_name, :string

  end
end
