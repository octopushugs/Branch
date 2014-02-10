class AddHandlesToOrgs < ActiveRecord::Migration
  def change

  	add_column :orgs, :pphandle, :string
  	add_column :orgs, :pphandletype, :string
  	add_column :orgs, :org_appointment_date, :string

  end
end
