class CreateOrgs < ActiveRecord::Migration
  def change
    create_table :orgs do |t|

      t.timestamps
    end
  end
end
