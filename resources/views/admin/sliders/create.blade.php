@extends('layout.app')

@section('content')
    <h1>Add New Slider</h1>
    <form action="{{ route('admin.sliders.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <label for="image">Upload Image:</label>
        <input type="file" name="image" id="image" required>
        <button type="submit">Add Slider</button>
    </form>
@endsection