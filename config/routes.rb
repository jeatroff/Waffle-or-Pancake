Rails.application.routes.draw do
  resources :turns
  resources :user_games
  resources :games
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/hello', to: 'application#hello_world'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/users', to: 'users#index'
  get '/games', to: 'games#index'
  post '/games', to: 'games#create'
  post '/usergames', to: 'user_games#create'
end
