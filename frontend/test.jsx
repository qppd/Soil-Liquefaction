// @include('includes/header')
// @include('includes/modal_gate')

// <style>
//     #cameraView {
//         width: 240px;
//         height: 160px;
//         margin: 0 auto;
//         background: black;
//         border: 5px solid black;
//         border-radius: 10px;
//         box-shadow: 0 5px 50px #333
//     }
// </style>

<main class="hold-transition layout-top-nav">
  <div class="wrapper">
    {/* <!-- Preloader --> */}
    <div class="preloader flex-column justify-content-center align-items-center">
      <img
        class="animation__shake"
        src="{{ url('storage/images/login-logo.png') }}"
        alt="IOT Ligtas"
        height="180"
        width="180"
      />
      <h1>Ligtas</h1>
    </div>
    {/* <!-- Preloader --> */}

    {/* @include('includes/navbar') */}

    {/* <!-- Content Wrapper. Contains page content --> */}
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Smart Gate</h1>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </section>
      {/* <!-- Main content --> */}
      <section class="content">
        {/* @if ($errors->any())
                    <div class='alert alert-danger alert-dismissible'>
                        <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                        <h4><i class='icon fa fa-warning'></i> Error!</h4>
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @if (session()->has('success'))
                    <div class='alert alert-success alert-dismissible'>
                        <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
                        <h4><i class='icon fa fa-check'></i> Success!</h4>
                        <ul>
                            {{ session()->get('success') }}
                        </ul>
                    </div>
                @endif */}

        <div class="container-fluid">
          {/* <!-- Small boxes (Stat box) --> */}
          <div class="row">
            <div class="card" style="width:100%;">
              <div class="card-header">
                {/* {{-- <a href="#add" data-toggle="modal" class="btn btn-primary btn-sm btn-flat"><i
                                        class="fas fa-plus"></i> New</a> --}}
                                <a class="btn" data-toggle="modal" href="#delete">Launch Modal</a> */}
              </div>
              {/* <!-- /.card-header --> */}
              <div class="card-body">
                {/* @foreach ($cameras as $index => $camera) */}
                {/* <div class="col-md-12 col-lg-6 col-xl-4">
                                            <div class="card mb-2">
                                                <img class="card-img-top"
                                                    src="{{ url('storage/images/cctv-image.png') }}" alt="Dist Photo 3" />
                                                <div class="card-img-overlay">
                                                    <h5 class="card-title text-primary">Camera {{ $index + 1 }}</h5>
                                                    <br />
                                                    <h5 class="card-title text-primary">ID: {{ $camera['camera_id'] }}
                                                    </h5>
                                                    <br>
                                                    <h5 class="card-title text-primary">TYPE: {{ $camera['type'] }}</h5>
                                                    <p class="card-text pb-1 pt-1 text-white">
                                                        <br>
                                                        <br>
                                                        <br> <br>
                                                        <br>
                                                    </p>
                                                    <a href="/ecr/cameras/live/{{ $camera['camera_id'] }}" class="text-primary">View Live Camera Feed</a>
                                                    <br>

                                                    <button type="button" class="btn btn-danger btn-sm delete"
                                                        data-id="{{ $camera['id'] }}"><i class="fas fa-trash"></i>
                                                        Remove</button>

                                                </div>
                                            </div>
                                        </div> */}
                {/* @endforeach */}

                <table id="example4" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Face</th>
                      <th>Temperature</th>
                      <th>Metal</th>
                      <th>Status</th>
                      {/* <th>Tools</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* @foreach ($gates as $gate)
                                                <tr>
                                                    <td>{{ $gate['staff'] }}</td>
                                                    <td>{{ $gate['face_id'] }}</td>
                                                    <td>{{ $gate['body_temperature'] }}</td>
                                                    <td>{{ $gate['metal_detection'] }}</td>
                                                    <td>{{ $gate['status'] }}</td>
                                                </tr>
                                            @endforeach */}
                  </tbody>
                  <tfoot></tfoot>
                </table>
                <div class="row">
                  <div class="col-sm-12">
                    <div id="cameraContainer">
                      <canvas
                        id="faceCanvas"
                        width="240"
                        height="160"
                        style="position: absolute;"
                      ></canvas>
                      {/* <video id="cameraView" autoplay playsinline muted></video>  */}
                      <img id="cameraView" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /.card-body --> */}
            </div>
            {/* <!-- /.card --> */}
          </div>
        </div>
      </section>
      {/* // <!-- right col --> */}
    </div>
    {/* <!-- /.row (main row) --> */}
  </div>
  {/* <!-- /.container-fluid --> */}

  {/* <!-- jQuery --> */}
  {/* @include('includes/scripts') */}
</main>;
