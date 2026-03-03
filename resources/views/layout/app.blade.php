<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
</head>
<body>
    <nav>
        <a href="{{ route('admin.sliders.index') }}">Sliders</a>
    </nav>
    <main>
        @yield('content')
    </main>
</body>
</html>