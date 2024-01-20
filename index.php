<?php $title = ' OpaD@m' . ' Jukebox'; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $title ?></title>
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <link defer rel="stylesheet" href="style.css?">
  <script defer src="./script.js?"></script>
</head>

<?php
// DEFINE VARIABLES AND SET TO EMPTY VALUES ---
$songs = [];
$songs_array = [];
$search_array = [];
$shuffle_array = [];
$musicPath = "../_music/";
$shuffle = 'off';
$search = 'off';
$playing = 'off';
$dirName = 'Muziek';
// DIRNAME ///////////////////////////////////////////////////
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  if (isset($_POST["dirName"])) {
    $dirName = $_POST["dirName"];             //DIRNAME
  }
}
if (empty($dirName)) {
  $dirName = "Muziek";
}
$filePath = $musicPath . $dirName . "/"; //FILEPATH

// ! MAKE ARRAY $SONGS_array ---- SCANDISK -----------
global $filePath;
$files = scandir($filePath);
foreach ($files as $file) {
  if (substr($file, -4) === ".mp3") {
    $file = substr($file, 0, -4);
    array_push($songs_array, $file);
  }
}

// $songs_shuffle = array_merge(array(), $songs_array);
$songs_index = array_merge(array(), $songs_array);      // ! COPY array to new array //
?>

<body>
  <!-- set clock timezone -->
  <?php date_default_timezone_set('Europe/Amsterdam'); ?>
  <p class="clock" id="time"></p>

  <header id="header">
    <form id="form" class="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" autocomplete="input">

      <input class="btn" id="myInput" type="text" name="input" placeholder="Search..."> <!-- Search input -->

      <select class="btn" id="dirName" name="dirName"> <!-- select dirName -->
        <option value="<?= $dirName ?>"><?= $dirName ?></option>
        <option value="Muziek">Muziek</option>
        <option value="Evergreen">Evergreen</option>
        <option value="kerst_songs">kerst_songs</option>
        <option value="line_dance_Annie">line_dance</option>
        <option value="top25nl">top25nl</option>
        <option value="country">Country</option>
        <option value="GradDamen">Grad Damen</option>
        <option value="Juan Gabriel">Juan Gabriel</option>
        <option value="theCats">The Cats</option>
        <option value="Top40">Top40</option>
        <option value="Test opstelling">Test opstelling</option>
        <option value="TOP 2000 van 1965 tot 1985">TOP 2000 van 1965 tot 1985</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1965">Top 40 - 1965 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1966">Top 40 - 1966 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1967">Top 40 - 1967 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1968">Top 40 - 1968 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1969">Top 40 - 1969 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1970">Top 40 - 1970 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1971">Top 40 - 1971 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1972">Top 40 - 1972 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1973">Top 40 - 1973 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1974">Top 40 - 1974 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1975">Top 40 - 1975 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1976">Top 40 - 1976 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1977">Top 40 - 1977 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1978">Top 40 - 1978 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1979">Top 40 - 1979 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1980">Top 40 - 1980 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1981">Top 40 - 1981 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1982">Top 40 - 1982 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1983">Top 40 - 1983 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1984">Top 40 - 1984 top100</option>
        <option value="TOP 100-JAAROVERZICHT VAN 1985">Top 40 - 1985 top100</option>
      </select> <!-- select dirName -->

      <input type="checkbox" class="btn" id="shuffle" name="shuffle"> <!-- Shuffle checked -->
      <label for="shuffle">Shuffle</label> <!-- Shuffle checked -->

      <button class="select btn" type="submit">Enter</button> <!-- submit -->
    </form>

    <audio id="audioPlayer" controls src=""></audio>
    <h3 id="prt_song" class='blink-class'></h3>
    <button class='btn' onclick='goToPlaying()'>goto Playing</button>
    <button class='btn' onclick='goToPlayList()'>goto Play List</button>
    <button class='btn' onclick='prev_song()'>
      << PREV </button>
        <button class='btn' onclick='next_song()'> NEXT >> </button>
        <!-- <button class='exit' onclick='closeOpenedWindow()'>X</button> -->


        <!-- <button class='btn' onclick= "$shuffle = 'on'; shuffle_local_array(); reload();">SHUFFLE SONG</button> -->
  </header>
  <img class="coin" src="./image/coin-input.jpg" alt="coin" width='46px'>
  <img class="neon" src="./image/neon.gif" alt="coin" width='300'>


  <div id="container">
    <div id="div1"></div>
    <center class="prt_h3">
      <h3>***** LocalList *****
        <hr>
      </h3>
    </center>
    <div id="localList"></div>
    <center class="prt_h3">
      <h3>***** Play List *****
        <hr>
      </h3>
    </center>
    <div id="playList">


      <?php

      // ! Shuffle Array $songs ------SHUFFLE ARRAY----------///
      function shuffle_array()
      {
        global $shuffle_array, $songs_array;
        $shuffle_array = $songs_array;
        shuffle($shuffle_array);
        return $shuffle_array;
      }

      if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (!empty($_POST["shuffle"])) {
          $shuffle = "on";
          $songs_array =  shuffle_array();
        }
      }

      // ! Shuffle Array $songs ---------End----////
      // ! POST input search----------------------------------------------------
      if (isset($_POST['input']));
      $search = filter_input(INPUT_POST, 'input', FILTER_SANITIZE_SPECIAL_CHARS);
      if (empty($search)) $search = '';

      $search = strtolower($search);

      foreach ($songs_array as $file) {
        $file = strtolower($file);
        if (str_contains($file, $search)) {
          array_push($search_array, $file);
        };
      };
      if (!empty($search_array) && $playing == "off") {
        $search = "on";
        $songs = $search_array;
        print_array();
      } else {
        $search = "off";
        $playing = "on";
      };

      function print_array()
      {
        global $filePath, $search, $songs, $playing, $dirName, $songs_array;
        if ($search === "off")$songs = $songs_array;
        foreach ($songs as $key => $value) {
          $txt =  explode("-", $value);
          $txt[0] = strtoupper($txt[0]);
          $txt[1] = strtoupper($txt[1]);
          if (isset($txt[2])) {
            $txt[2] = strtoupper($txt[2]);
          } else {
            $txt[2] = '';
          }

          if (
            $dirName == "Muziek" ||
            $dirName == "theCats" ||
            $dirName == "line_dance_Annie" ||
            $dirName == "kerst_songs" ||
            $dirName == "Juan Gabriel" ||
            $dirName == "GradDamen" ||
            $dirName == "country" ||
            $dirName == "Christmas" ||
            $dirName == "Bobby Goldsboro" ||
            $dirName == "top25nl"
          ) {
            $value2 = $txt[0] . " - " . $txt[1];
          } else {
            $value2 = $txt[1] . " - " . $txt[2];
          }

          echo "<li class='$key list' id='$key' >
          <p class='center_point2'></p>
          <img class='$key hoes' src='$filePath/$value.jpg' loading='lazy' >
          <p class='$key txt1'>$value2</p>
          <span><b class='local add' onclick='nr=null;local_add({$key})'>ADD</b></span>
          </li> ";
        }
        // $search = "off";
        $playing = "off";
      }
      ?>
    </div>

  </div>

  <script>
    console.log('php_script.php');
    const musicPath = <?= json_encode($musicPath); ?>;
    const filePath = <?= json_encode($filePath); ?>;
    let dirName = <?= json_encode($dirName); ?>;
    let songs = <?= json_encode($songs); ?>;
    let songs_array = <?= json_encode($songs_array); ?>;
    let songs_index = <?= json_encode($songs_index); ?>;
    let search_array = <?= json_encode($search_array); ?>;
    let shuffle_array = <?= json_encode($shuffle_array); ?>;
    let shuffle = <?= json_encode($shuffle); ?>;
    let search = <?= json_encode($search); ?>;
    let playing = <?= json_encode($playing); ?>;
  </script>


</body>

</html>
