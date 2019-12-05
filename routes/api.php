<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['api'], 'prefix' => 'v1'], function () {

    Route::get('/datalake/statistics',          'DatalakeController@statistics');

    Route::get('/schemas',                      'SchemaController@all');
    Route::get('/schemas/hidden-list',          'SchemaController@getHiddenSchema');
    Route::get('/schemas/search',               'SchemaController@search');
    Route::get('/schemas/get-by-code',          'SchemaController@getByCode');
    Route::get('/schemas/samples',              'SchemaController@getDataSamples');
    Route::get('/schemas/{id}',                 'SchemaController@show');


    Route::get( '/datasources',              'DatasourceController@all');
    Route::get( '/datasources/list-all',     'DatasourceController@listAll');
    Route::get( '/datasources/schemas',      'DatasourceController@getSchemasByCode');
    Route::post('/datasources/update-doc',   'DatasourceController@updateDoc');
    Route::get( '/datasources/search',       'DatasourceController@search');
    Route::get( '/datasources/{id}',         'DatasourceController@show');

    // TAGS
    Route::post(    '/tags',            'TagController@create');
    Route::post(    '/tags/append',     'TagController@append');
    Route::get(     '/tags',            'TagController@all');
    Route::get(     '/tags/list-name',  'TagController@listName');
    Route::get(     '/tags/{id}',       'TagController@show');
    Route::put(     '/tags/{id}',       'TagController@edit');
    Route::delete(  '/tags/{id}',       'TagController@destroy');
});