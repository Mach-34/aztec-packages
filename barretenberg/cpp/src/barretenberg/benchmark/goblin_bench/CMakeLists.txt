# Each source represents a separate benchmark suite 
set(BENCHMARK_SOURCES
  goblin.bench.cpp
  eccvm.bench.cpp
)

# Required libraries for benchmark suites
set(LINKED_LIBRARIES
  ultra_honk
  eccvm
  stdlib_recursion
  benchmark::benchmark
)

# Add executable and custom target for each suite, e.g. ultra_honk_bench
foreach(BENCHMARK_SOURCE ${BENCHMARK_SOURCES})
  get_filename_component(BENCHMARK_NAME ${BENCHMARK_SOURCE} NAME_WE) # extract name without extension
  add_executable(${BENCHMARK_NAME}_bench main.bench.cpp ${BENCHMARK_SOURCE})
  target_link_libraries(${BENCHMARK_NAME}_bench ${LINKED_LIBRARIES})
  add_custom_target(run_${BENCHMARK_NAME} COMMAND ${BENCHMARK_NAME} WORKING_DIRECTORY ${CMAKE_BINARY_DIR})
endforeach()