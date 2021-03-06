{
  "targets": [
    {
      "target_name": "easyloggingpp",
      "sources": [
        "src/binding.cc",
        "deps/easylogging++.cc"
      ],
      "defines": [
        "ELPP_FEATURE_CRASH_LOG",
        "ELPP_DEFAULT_LOG_FILE=\"/dev/null\""
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "conditions": [
        ['OS=="mac"', 
          {
            "xcode_settings": {
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            },
            "ccflags": [
               "-mmacosx-version-min=10.7",
               "-std=c++11",
               "-stdlib=libc++",
            ],
          }
        ],
        ['OS=="win"', {
          "defines": [
            "ELPP_DEFAULT_LOG_FILE=\"nul\"",
          ],
        }],
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "deps/"
      ],
    },
  ],
}
