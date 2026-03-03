@extends('layout.app')

@section('content')
    <h1>Manage Sliders</h1>
    <a href="{{ route('admin.sliders.create') }}">Add New Slider</a>
    <ul>
        @foreach ($sliders as $slider)
            <li>
                <img src="{{ asset('storage/' . $slider->image_path) }}" alt="Slider" width="200">
                <form action="{{ route('admin.sliders.destroy', $slider) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            </li>
        @endforeach
    </ul>
@endsection