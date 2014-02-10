Branch::Application.routes.draw do

	
resources :orgs, :students, :events

namespace :api do 
	namespace :v1 do
		post '/login' => 'login#check_login'
		post '/layout/orgs/' => 'pagelayouts#get_orgs'
		post '/layout/orgabout/' => 'pagelayouts#get_org_about'
    post '/layout/feed/' => 'pagelayouts#feed'
    post '/layout/event-list/' => 'pagelayouts#event_list'

		post '/index' => 'students#index'
		post '/student_orgs' => 'students#student_orgs'
		post '/student_events' => 'students#student_events'
		post '/rsvp' => 'students#rsvp'
		post '/join' => 'students#join'
		post '/create' => 'students#create'

	end
end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
